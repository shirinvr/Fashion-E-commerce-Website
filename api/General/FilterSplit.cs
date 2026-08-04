public static class FilterSplit
{
    public static string ChangeFilter(this string filter)
    {
        if (string.IsNullOrWhiteSpace(filter)) return "";

        // Split the input string into two parts using '|' as the delimiter
        var parts = filter.Split('|');
        if (parts.Length != 2) return "";

        var columnName = parts[0].Trim();
        var value = parts[1].Trim();

        // Construct the SQL-like condition
        return $" and {columnName} like '%{value}%'";
    }
}
