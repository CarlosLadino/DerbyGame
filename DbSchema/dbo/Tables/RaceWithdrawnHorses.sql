CREATE TABLE [dbo].[RaceWithdrawnHorses] (
    [Id]          INT IDENTITY (1, 1) NOT NULL,
    [RaceId]      INT NOT NULL,
    [HorseNumber] INT NOT NULL,
    CONSTRAINT [PK_RaceWithdrawnHorses] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_RaceWithdrawnHorses_Races] FOREIGN KEY ([RaceId]) REFERENCES [dbo].[Races] ([Id]) ON DELETE CASCADE
);

