 CREATE View dbo.VW_Guests
  AS
  Select Distinct
	g.Id
	,g.[Name]
    ,g.[IsActive]
    ,g.[AvatarName]
    ,g.[IsSystem]
	,Cast(Case when erg1.Id Is Null or erg2.Id Is Null then 1 Else 0 End As bit) As CanDelete
  FROM [dbo].[Guests] g
  Left Join EventRaceGuests erg1 on erg1.Guest1Id = g.Id
  Left Join EventRaceGuests erg2 on erg2.Guest1Id = g.Id