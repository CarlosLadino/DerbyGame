
CREATE PROCEDURE [dbo].[SaveEventRaces]
	@EventId int,
	@RaceIds nvarchar(500)
AS
BEGIN
;WITH EventsToDeleteCTE(EventRaceId) AS
(
	Select er.Id
	From EventRaces er 
	Inner Join VW_EventRaces vwer On vwer.EventRaceId = er.Id
	Where er.EventId = @EventId
	And vwer.Saved = 0
	And vwer.RaceId NOT IN (Select CAST(value AS INT) From string_split(@RaceIds, ','))
)
	Delete er 
	From EventRaces er
	Inner Join EventsToDeleteCTE eCte On eCte.EventRaceId = er.Id 
	
	if Exists (Select 'x' From string_split(@RaceIds, ',')
	Where CAST(value AS INT) NOT IN (Select RaceId From EventRaces er Where er.EventId = @EventId))
	Begin
		Insert Into EventRaces(EventId, RaceId)
		Select @EventId, CAST(value AS INT) 
		From string_split(@RaceIds, ',')
		Where CAST(value AS INT) NOT IN (Select RaceId From EventRaces er Where er.EventId = @EventId)
		and CAST(value AS INT) <> 0
	END
END

