CREATE TABLE [dbo].[RaceProgress]
(
	[Id]  INT IDENTITY (1, 1) NOT NULL, 
    [RaceId] INT NOT NULL,
    [PlaceId] INT NOT NULL, 
    [TimeMarker] INT NOT NULL, 
    [HorseNumber] INT NOT NULL,
    CONSTRAINT [PK_RaceProgress] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_RaceProgress_Places] FOREIGN KEY ([PlaceId]) REFERENCES [dbo].[Places] ([Id]),
    CONSTRAINT [FK_RaceProgress_Races] FOREIGN KEY ([RaceId]) REFERENCES [dbo].[Races] ([Id]) ON DELETE CASCADE
    
)
