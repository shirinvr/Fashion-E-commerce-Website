using Newtonsoft.Json.Linq;

public interface IDynamicService
{
    Task<JObject> ExecuteDynamicRequest(DynamicRequest request);
}
