public interface IMenuService
{
    Task<List<MenuMaster>> GetAllMenus(string RoleType);
}