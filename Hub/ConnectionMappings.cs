namespace ChatMicroservice.Hub;

public class ConnectionMapping
{
    private readonly Dictionary<string, HashSet<string>> _connections = new ();

    public void Add(string key, string connectionId)
    {
            HashSet<string> connections;
            if (!_connections.TryGetValue(key, out connections))
            {
                connections = new HashSet<string>();
                _connections.Add(key, connections);
            }

            lock (connections)
            {
                connections.Add(connectionId);
            }
    }

    public IEnumerable<string> GetUsersConnections(string key)
    {
        HashSet<string> connections;
        if (_connections.TryGetValue(key, out connections))
        {
            return connections;
        }

        return Enumerable.Empty<string>();
    }

    public void Remove(string key, string connectionId)
    {
        lock (_connections)
        {
            HashSet<string> connections;
            if (!_connections.TryGetValue(key, out connections))
            {
                return;
            }

            lock (connections)
            {
                connections.Remove(connectionId);

                if (connections.Count == 0)
                {
                    _connections.Remove(key);
                }
            }
        }
    }
}
