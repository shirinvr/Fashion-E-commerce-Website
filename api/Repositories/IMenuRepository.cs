public interface IMenuRepository
{
    Task<List<MenuMaster>> GetAllMenus(string RoleType);
}