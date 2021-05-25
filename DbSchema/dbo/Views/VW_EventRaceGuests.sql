CREATE View [dbo].[VW_EventRaceGuests] AS

Select
	erg.Id,
	erg.EventRaceId,
	erg.Guest1Id,
	isnull(erg.Guest2Id,0) AS Guest2Id,
	p1.Name as Guest1Name,
	p2.Name AS Guest2Name,
	isnull(p1.AvatarName, 'person.png') As Guest1Avatar,
	isnull(p2.AvatarName, 'person.png') As Guest2Avatar,
	AssignedHorseNumber,
	isnull(erg.PlaceId,0) as PlaceId,
	erg.WonAmount
from 
	EventRaceGuests erg
	inner Join Guests p1
	on erg.Guest1Id = p1.Id
	left Join Guests p2
	on erg.Guest2Id = p2.Id






