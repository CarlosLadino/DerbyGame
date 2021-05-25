CREATE View [dbo].[VW_Races]
  AS
  With WithdrawnHorsesCTE (RaceId, WHNumber) AS
(
	Select RaceId, COUNT('x') As WithdrawnHorses From RaceWithdrawnHorses Group By RaceId
)
  Select Distinct
	r.Id
	,r.[Name]
    ,r.[Url]
    ,r.[NumberOfHorses]
    ,r.[Archived]
	,r.VideoName
	,IsNull(wh.WHNumber,0) As ScratchedHorses
	,Cast(Case when er.Id Is Null then 1 Else 0 End As bit) As CanDelete
  FROM [dbo].[Races] r
  Left Join WithdrawnHorsesCTE wh on wh.RaceId = r.Id
  Left Join EventRaces er on er.RaceId = r.Id
