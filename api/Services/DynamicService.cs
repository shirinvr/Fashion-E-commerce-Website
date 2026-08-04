using System.Xml.Linq;
using Newtonsoft.Json.Linq;

public class DynamicService : IDynamicService
{
    private readonly IDynamicRepository _repo;
    private readonly XDocument _apiMappings;

    public DynamicService(IDynamicRepository repo, XDocument apiMappings)
    {
        _repo = repo;
        _apiMappings = apiMappings;
    }

    public Task<JObject> ExecuteDynamicRequest(DynamicRequest request)
    {
        // Lookup SP from XML
        var spName = _apiMappings
            .Descendants("ApiMethod")
            .Where(x => (string)x.Attribute("name") == request.SpName)
            .Select(x => (string)x.Element("StoredProcedure"))
            .FirstOrDefault();

        if (spName == null)
            throw new Exception($"Stored procedure not found for API method '{request.SpName}'");

        return _repo.ExecuteProcedureAsync(spName, request.Parameters);
    }
}
