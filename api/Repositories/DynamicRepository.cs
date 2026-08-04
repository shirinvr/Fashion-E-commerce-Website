using System.Data;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json.Linq;
using System.Xml.Linq;
using System.Text.Json;

public class DynamicRepository : IDynamicRepository
{
    private readonly string _connectionString;

    public DynamicRepository(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("DefaultConnection");
    }

    public async Task<JObject> ExecuteProcedureAsync(
    string spName,
    Dictionary<string, object> parameters)
    {
        using var conn = new SqlConnection(_connectionString);
        using var cmd = new SqlCommand(spName, conn)
        {
            CommandType = CommandType.StoredProcedure
        };

        var xmlRoot = new XElement("root");

        if (parameters != null)
        {
            // CASE 1: SAVE / UPDATE APIs (entity present)
            if (parameters.ContainsKey("entity"))
            {
                JObject entity;
                if (parameters["entity"] is JsonElement jsonElement)
                {
                    entity = JObject.Parse(jsonElement.GetRawText());
                }
                else
                {
                    entity = JObject.FromObject(parameters["entity"]);
                }
                var entityElement = new XElement("entity");

                foreach (var prop in entity.Properties())
                {
                    // Handle arrays (users)
                    if (prop.Value.Type == JTokenType.Array)
                    {
                        var listElement = new XElement(prop.Name);

                        foreach (var item in prop.Value)
                        {
                            // generic handling for array objects
                            foreach (var field in ((JObject)item).Properties())
                            {
                                listElement.Add(
                                    new XElement(
                                        field.Name,
                                        field.Value?.ToString()
                                    )
                                );
                            }
                        }

                        entityElement.Add(listElement);
                    }
                    else
                    {
                        entityElement.Add(
                            new XElement(prop.Name, prop.Value?.ToString())
                        );
                    }
                }

                xmlRoot.Add(entityElement);
            }
            // CASE 2: GET / LIST APIs (flat params)
            else
            {
                foreach (var param in parameters)
                {
                    xmlRoot.Add(
                        new XElement(
                            param.Key,
                            param.Value?.ToString()
                        )
                    );
                }
            }
        }

        cmd.Parameters.Add("@XmlData", SqlDbType.Xml).Value = xmlRoot.ToString();

        await conn.OpenAsync();

        var tables = new List<DataTable>();

        using (var reader = await cmd.ExecuteReaderAsync())
        {
            do
            {
                var dt = new DataTable();

                for (int i = 0; i < reader.FieldCount; i++)
                    dt.Columns.Add(reader.GetName(i), reader.GetFieldType(i));

                while (reader.Read())
                {
                    var vals = new object[reader.FieldCount];
                    reader.GetValues(vals);
                    dt.Rows.Add(vals);
                }

                tables.Add(dt);

            } while (await reader.NextResultAsync());
        }

        bool success = false;
        string message = "No message returned";

        if (tables.Count > 0 && tables[0].Rows.Count > 0)
        {
            success = Convert.ToBoolean(tables[0].Rows[0]["Success"]);
            message = tables[0].Rows[0]["Message"]?.ToString();
        }

        var data = new JObject();

        for (int t = 1; t < tables.Count; t++)
        {
            var arr = new JArray();
            foreach (DataRow row in tables[t].Rows)
            {
                var obj = new JObject();
                foreach (DataColumn col in tables[t].Columns)
                    obj[col.ColumnName] = JToken.FromObject(row[col]);
                arr.Add(obj);
            }

            data[$"result{t}"] = arr;
        }

        return new JObject
        {
            ["success"] = success,
            ["message"] = message,
            ["data"] = data
        };
    }


}
