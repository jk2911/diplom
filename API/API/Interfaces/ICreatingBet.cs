using API.Entities;
using System.Collections;

namespace API.Interfaces
{
    public interface ICreatingBet
    {
        ICollection<Bet> CreateBet();
    }
}
