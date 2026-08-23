using Newtonsoft.Json.Linq;
using System.Text.Json;
using System.Xml.Linq;

public class DynamicService : IDynamicService
{
    private readonly IDynamicRepository _repo;
    private readonly XDocument _apiMappings;

    public DynamicService(
        IDynamicRepository repo,
        XDocument apiMappings)
    {
        _repo = repo;
        _apiMappings = apiMappings;
    }

    public async Task<JObject> ExecuteDynamicRequest(
        DynamicRequest request)
    {
        if (request == null)
            throw new ArgumentNullException(nameof(request));

        if (string.IsNullOrWhiteSpace(request.SpName))
            throw new ArgumentException(
                "API method name is required.");

        // Find stored procedure
        var spName = _apiMappings
            .Descendants("ApiMethod")
            .Where(x =>
                string.Equals(
                    (string)x.Attribute("name"),
                    request.SpName,
                    StringComparison.OrdinalIgnoreCase))
            .Select(x => (string)x.Element("StoredProcedure"))
            .FirstOrDefault();

        if (string.IsNullOrWhiteSpace(spName))
        {
            throw new Exception(
                $"Stored procedure not found for API method '{request.SpName}'.");
        }

        // Convert JsonElement → JToken
        JToken? parameters = null;

        if (request.Parameters.HasValue)
        {
            parameters = JToken.Parse(
                request.Parameters.Value.GetRawText());
        }

        return await _repo.ExecuteProcedureAsync(
            spName,
            parameters);
    }
}