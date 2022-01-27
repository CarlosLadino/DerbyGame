CREATE VIEW [dbo].[VW_RaceProgress]
	AS 
	Select 
ROW_NUMBER() OVER(ORDER BY RaceId ASC) AS Id,
RaceId,
TimeMarker,
max(case when PlaceId = 1 Then HorseNumber END) AS FirstPlace,
max(case when PlaceId = 2 Then HorseNumber END) AS SecondPlace,
max(case when PlaceId = 3 Then HorseNumber END) AS ThirdPlace   
from RaceProgress
group by RaceId, TimeMarker
