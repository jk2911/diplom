namespace API.Entities
{
    public class HistoryBankAccount
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public float Money { get; set; }
        public DateTime Date { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
