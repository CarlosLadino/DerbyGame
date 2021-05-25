

CREATE View [dbo].[VW_EventGuestTotals]
AS

With Guest1 (EventId, Id, GuestName, GuestAvatar, WonAmount)
AS
(
Select 
	er.EventId,
	g1.Id,
	g1.Name,
	IsNull(g1.AvatarName,'person.png') As AvatarName,
	WonAmount = Case When erg.Guest2Id is null Then erg.WonAmount Else erg.WonAmount/2 End  
from EventRaceGuests erg
Inner Join Guests g1
on erg.Guest1Id = g1.Id
Inner Join EventRaces er
On erg.EventRaceId = er.Id
Where WonAmount > 0
),
Guest2 (EventId, Id, GuestName, GuestAvatar, WonAmount)
AS
(
Select 
	er.EventId,
	g2.Id,
	g2.Name,
	IsNull(g2.AvatarName,'person.png') As AvatarName,
	erg.WonAmount/2 As WonAmount  
from EventRaceGuests erg
Inner Join Guests g2
on erg.Guest1Id = g2.Id
Inner Join EventRaces er
On erg.EventRaceId = er.Id
Where WonAmount > 0
And erg.Guest2Id is not null
)

Select Id, EventId, GuestName, GuestAvatar, SUM(WonAmount) As TotalAmount
From
(
Select * 
From Guest1
Union All 
Select * From Guest2) as Guests 
Group By Id, EventId, GuestName, GuestAvatar



