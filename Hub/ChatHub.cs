using ChatMicroservice.Dtos;
using Microsoft.AspNetCore.SignalR;

namespace ChatMicroservice.Hub;

public sealed class ChatHub : Hub<IChatHub>
{
    private readonly ConnectionMapping _connections = new();
    private readonly IHubContext<ChatHub, IChatHub> _context;

    public ChatHub(IHubContext<ChatHub, IChatHub> context)
    {
        _context = context;
    }

    public override Task OnConnectedAsync()
    {
        var username = Context.GetHttpContext()!.Request.Query["username"].ToString();

        ArgumentNullException.ThrowIfNull(username);

        _connections.Add(username, Context.ConnectionId);

        return base.OnConnectedAsync();
    }

    public async Task SendMessage(SendMessageDto sendMessageDto)
    {
        var connectionIds = _connections.GetUsersConnections(sendMessageDto.To);

        var tasks = connectionIds.Select(c => _context.Clients.Client(c).ReceiveMessage(new MessageDto(sendMessageDto.From, sendMessageDto.Message)));

        await Task.WhenAll(tasks);
    }
}
