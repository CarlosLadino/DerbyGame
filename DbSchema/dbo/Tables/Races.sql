CREATE TABLE [dbo].[Races] (
    [Id]             INT            IDENTITY (1, 1) NOT NULL,
    [Name]           NVARCHAR (256) NOT NULL,
    [Url]            NVARCHAR (256) NOT NULL,
    [NumberOfHorses] INT            NOT NULL,
    [Archived]       BIT            CONSTRAINT [DF_Races_Archive] DEFAULT ((0)) NOT NULL,
    [VideoName]      NVARCHAR (100) NULL,
    CONSTRAINT [PK_Races] PRIMARY KEY CLUSTERED ([Id] ASC)
);

