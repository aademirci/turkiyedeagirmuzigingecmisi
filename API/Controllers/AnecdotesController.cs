using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Anecdotes;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class AnecdotesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<AnecdoteDTO>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AnecdoteDTO>> Details(int id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsAnecdoteHost")]
        public async Task<ActionResult<Unit>> Edit(int id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsAnecdoteHost")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await Mediator.Send(new Delete.Command{Id = id});
        }

        [HttpPost("{id}/fave")]
        public async Task<ActionResult<Unit>> Fave(int id)
        {
            return await Mediator.Send(new Fave.Command{Id = id});
        }

        [HttpDelete("{id}/fave")]
        public async Task<ActionResult<Unit>> UnFave(int id)
        {
            return await Mediator.Send(new UnFave.Command{Id = id});
        }
    }
}