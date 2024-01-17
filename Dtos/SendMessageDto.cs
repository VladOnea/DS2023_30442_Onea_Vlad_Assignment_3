namespace ChatMicroservice.Dtos;

public class SendMessageDto
{
    public required string To { get; set; }
    public required string From { get; set; }

    public required string Message { get; set; }
}
