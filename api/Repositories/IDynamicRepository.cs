using Newtonsoft.Json.Linq;

public interface IDynamicRepository
{
    Task<JObject> ExecuteProcedureAsync(string storedProcedure, Dictionary<string, object> parameters);
}
