CREATE TABLE [dbo].[Events] (
    [Id]        INT            IDENTITY (1, 1) NOT NULL,
    [Name]      NVARCHAR (200) NOT NULL,
    [EventDate] DATE           NOT NULL,
    [Active]    BIT            CONSTRAINT [DF_Events_Active] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_Events] PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER dbo.SetActive 
   ON  dbo.Events
   After INSERT,UPDATE
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	Declare @Id int;
	Declare @Active bit;

	select @Id = Id, @Active = Active from inserted
	Update Events
	Set Active = Case when @Active = 0 Then Active Else 0 End
	where Id <> @Id
	
END
