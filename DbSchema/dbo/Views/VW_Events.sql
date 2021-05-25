  Create View dbo.VW_Events
  AS
SELECT Distinct e.[Id] 
      ,e.[Name]
      ,e.[EventDate]
      ,e.[Active]
	  ,Cast(Case when er.Id Is Null then 1 Else 0 End As bit) As CanDelete
  FROM [dbo].[Events] e
  Left Join EventRaces er On er.EventId = e.Id