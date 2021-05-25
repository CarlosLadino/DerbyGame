CREATE View [dbo].[VW_EventRaces] AS

With WithdrawnHorsesCTE (RaceId, WHNumber) AS
(
	Select RaceId, COUNT('x') As WithdrawnHorses From RaceWithdrawnHorses Group By RaceId
), RacesCTE (RaceId,RaceName,NumberOfHorses,RaceUrl,VideoName, Archived) AS
(
select Distinct
	r.Id as RaceId, 
	' (' + CAST(r.NumberOfHorses AS varchar(6)) + case when wh.RaceId is null Then '' Else '-'+Cast(wh.WHNumber as varchar(6)) End + ') ' + r.Name As RaceName,
	r.NumberOfHorses,
	r.Url AS RaceUrl,
	r.VideoName,
	r.Archived
	from Races r
	left Join  WithdrawnHorsesCTE wh On r.Id = wh.RaceId
)
Select
	ROW_NUMBER() OVER(ORDER BY TableJoin.EventId ASC) AS Id,
	TableJoin.EventId, 
	TableJoin.RaceId,
	TableJoin.RaceName,
	TableJoin.NumberOfHorses,
	TableJoin.RaceUrl,
	TableJoin.VideoName,
	TableJoin.Archived,
	isnull(Selected.Id,0) AS EventRaceId,
CAST(case when Selected.RaceId is null Then 0 Else 1 End AS bit) AS Selected,  
CAST(case when saved.EventRaceId is null Then 0 Else 1 End AS bit) AS Saved
from
(select 
	RaceId, 
	RaceName,
	NumberOfHorses,
	RaceUrl,
	VideoName,
	Archived,
	e.Id as EventId 
	from RacesCTE
	Cross Join Events e) AS TableJoin 
left join (Select er.Id, er.EventId, er.RaceId 
	from EventRaces er ) as Selected
on TableJoin.EventId = Selected.EventId
and TableJoin.raceId = Selected.RaceId
left join (select Distinct erg.EventRaceId from EventRaceGuests erg) as saved
on Selected.Id = saved.EventRaceId 











