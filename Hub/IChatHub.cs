using ChatMicroservice.Dtos;

namespace ChatMicroservice.Hub;

public interface IChatHub
{
    public Task ReceiveMessage(MessageDto message);
}
