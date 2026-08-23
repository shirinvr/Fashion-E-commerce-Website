using System.Data;
using Newtonsoft.Json.Linq;
using System.Xml.Linq;
using Microsoft.Data.SqlClient;

public class DynamicRepository : IDynamicRepository
{
    private readonly string _connectionString;

    public DynamicRepository(IConfiguration config)
    {
        _connectionString =
            config.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException(
                "DefaultConnection connection string is not configured.");
    }


    // =============================================================
    // Execute Procedure
    // =============================================================

    public async Task<JObject> ExecuteProcedureAsync(
        string spName,
        JToken? request)
    {
        if (string.IsNullOrWhiteSpace(spName))
            throw new ArgumentException(
                "Stored procedure name is required.",
                nameof(spName));

        var xmlRoot = BuildXml(request);

        string xmlData = xmlRoot.ToString(
            SaveOptions.DisableFormatting);

        await using var connection =
            new SqlConnection(_connectionString);

        await connection.OpenAsync();

        await using SqlTransaction transaction = (SqlTransaction)await connection.BeginTransactionAsync();

        try
        {
            var tables = new List<DataTable>();

            // ---------------------------------------------------------
            // Execute stored procedure
            // ---------------------------------------------------------

            await using var command =
                new SqlCommand(spName, connection, transaction)
                {
                    CommandType = CommandType.StoredProcedure,
                    CommandTimeout = 120
                };

            command.Parameters.Add(
                "@xmldata",
                SqlDbType.Xml).Value = xmlData;

            // ---------------------------------------------------------
            // Read ALL result sets
            // ---------------------------------------------------------

            await using var reader =
                await command.ExecuteReaderAsync();

            do
            {
                if (reader.FieldCount <= 0)
                    continue;

                var table = new DataTable();

                // Create columns
                for (int i = 0; i < reader.FieldCount; i++)
                {
                    string columnName = reader.GetName(i);

                    if (string.IsNullOrWhiteSpace(columnName))
                    {
                        columnName = $"Column{i + 1}";
                    }

                    // Avoid duplicate DataTable column names
                    if (table.Columns.Contains(columnName))
                    {
                        columnName =
                            $"{columnName}_{i + 1}";
                    }

                    table.Columns.Add(
                        columnName,
                        GetSafeFieldType(reader, i));
                }

                // Read rows
                while (await reader.ReadAsync())
                {
                    var row = table.NewRow();

                    for (int i = 0;
                         i < reader.FieldCount;
                         i++)
                    {
                        row[i] =
                            await reader.IsDBNullAsync(i)
                                ? DBNull.Value
                                : reader.GetValue(i);
                    }

                    table.Rows.Add(row);
                }

                tables.Add(table);

            } while (await reader.NextResultAsync());

            // ---------------------------------------------------------
            // Reader is completely consumed/disposed here
            // ---------------------------------------------------------

            await transaction.CommitAsync();

            return BuildResponse(tables);
        }
        catch
        {
            try
            {
                await transaction.RollbackAsync();
            }
            catch
            {
                // Do not hide the original exception.
            }

            throw;
        }
    }


    // =============================================================
    // Build XML
    // =============================================================

    private XElement BuildXml(JToken? request)
    {
        var root = new XElement("root");


        if (request == null ||
            request.Type == JTokenType.Null)
        {
            return root;
        }


        // Object
        if (request is JObject obj)
        {
            foreach (var property in obj.Properties())
            {
                root.Add(
                    ConvertPropertyToXml(
                        property.Name,
                        property.Value
                    )
                );
            }

            return root;
        }


        // Array
        if (request is JArray array)
        {
            foreach (var item in array)
            {
                root.Add(
                    ConvertItemToXml(item)
                );
            }

            return root;
        }


        // Simple value
        root.Add(
            new XElement(
                "value",
                request.ToString()
            )
        );

        return root;
    }


    // =============================================================
    // Convert Property
    // =============================================================

    private XElement ConvertPropertyToXml(
        string propertyName,
        JToken value)
    {
        var element =
            new XElement(propertyName);


        if (value == null ||
            value.Type == JTokenType.Null)
        {
            return element;
        }


        // Simple value
        if (value is JValue)
        {
            element.Value =
                value.ToString();

            return element;
        }


        // Object
        if (value is JObject obj)
        {
            foreach (var property in obj.Properties())
            {
                element.Add(
                    ConvertPropertyToXml(
                        property.Name,
                        property.Value
                    )
                );
            }

            return element;
        }


        // Array
        if (value is JArray array)
        {
            foreach (var item in array)
            {
                element.Add(
                    ConvertItemToXml(item)
                );
            }

            return element;
        }


        return element;
    }

    private Type GetSafeFieldType(
        SqlDataReader reader,
        int index)
    {
        try
        {
            return reader.GetFieldType(index);
        }
        catch
        {
            return typeof(object);
        }
    }


    // =============================================================
    // Convert Array Item
    // =============================================================

    private XElement ConvertItemToXml(JToken item)
    {
        var itemElement =
            new XElement("item");


        // Object
        if (item is JObject obj)
        {
            foreach (var property in obj.Properties())
            {
                itemElement.Add(
                    ConvertPropertyToXml(
                        property.Name,
                        property.Value
                    )
                );
            }

            return itemElement;
        }


        // Array
        if (item is JArray array)
        {
            foreach (var child in array)
            {
                itemElement.Add(
                    ConvertItemToXml(child)
                );
            }

            return itemElement;
        }


        // Simple value
        if (item != null &&
            item.Type != JTokenType.Null)
        {
            itemElement.Value =
                item.ToString();
        }


        return itemElement;
    }


    // =============================================================
    // Build Response
    // =============================================================

    private JObject BuildResponse(
        List<DataTable> tables)
    {
        var data = new JObject();


        for (int t = 0;
             t < tables.Count;
             t++)
        {
            var resultArray =
                new JArray();


            DataTable table =
                tables[t];


            foreach (DataRow row in table.Rows)
            {
                var item =
                    new JObject();


                foreach (DataColumn column
                    in table.Columns)
                {
                    object value =
                        row[column];


                    item[column.ColumnName] =
                        value == DBNull.Value
                            ? JValue.CreateNull()
                            : JToken.FromObject(value);
                }


                resultArray.Add(item);
            }


            data[$"result{t + 1}"] =
                resultArray;
        }


        return new JObject
        {
            ["success"] = true,
            ["message"] = "Success",
            ["data"] = data
        };
    }
}