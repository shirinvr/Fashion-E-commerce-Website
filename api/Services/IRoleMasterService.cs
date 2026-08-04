

public interface IRoleMasterService
{
    Task<List<RoleMaster>> GetAllRoles(string filter, int pageSize, int pageNumber,int filterType);
    Task<List<RoleMaster>> GetRoleById(int id);
    Task<OutputResponse> SaveRole(RoleMaster role);
    Task<string> DeleteRole(Guid id);
}
