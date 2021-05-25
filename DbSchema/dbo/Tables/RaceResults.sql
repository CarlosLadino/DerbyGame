CREATE TABLE [dbo].[RaceResults] (
    [Id]          INT IDENTITY (1, 1) NOT NULL,
    [RaceId]      INT NOT NULL,
    [PlaceId]     INT NOT NULL,
    [HorseNumber] INT NOT NULL,
    CONSTRAINT [PK_RaceResults] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_RaceResults_Places] FOREIGN KEY ([PlaceId]) REFERENCES [dbo].[Places] ([Id]),
    CONSTRAINT [FK_RaceResults_Races] FOREIGN KEY ([RaceId]) REFERENCES [dbo].[Races] ([Id]) ON DELETE CASCADE
);

