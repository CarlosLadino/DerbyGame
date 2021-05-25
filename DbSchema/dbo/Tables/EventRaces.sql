CREATE TABLE [dbo].[EventRaces] (
    [Id]      INT IDENTITY (1, 1) NOT NULL,
    [EventId] INT NOT NULL,
    [RaceId]  INT NOT NULL,
    CONSTRAINT [PK_EventRaces] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_EventRaces_Events] FOREIGN KEY ([EventId]) REFERENCES [dbo].[Events] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_EventRaces_Races] FOREIGN KEY ([RaceId]) REFERENCES [dbo].[Races] ([Id]) ON DELETE CASCADE
);

