using ChatMicroservice.Dtos;
using ChatMicroservice.Hub;
using EnergyManagamentUser.Controllers.Base;
using Microsoft.AspNetCore.Mvc;

namespace ChatMicroservice.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ChatController : BaseController
    {
        private readonly ChatHub _chatHub;
        public ChatController(ChatHub chatHub)
        {
            _chatHub = chatHub;
        }

        [HttpPost]
        public async Task<ActionResult> SendMessage([FromBody] SendMessageRequest request)
        {
            var message = new SendMessageDto {
                From = LoggedInUserName,
                To = request.To,
                Message = request.Message
            };

            await _chatHub.SendMessage(message);

            return Ok();
        }
    }
}
