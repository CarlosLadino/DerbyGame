CREATE TABLE [dbo].[EventRaceGuests] (
    [Id]                  INT   IDENTITY (1, 1) NOT NULL,
    [EventRaceId]         INT   NOT NULL,
    [Guest1Id]            INT   NOT NULL,
    [Guest2Id]            INT   NULL,
    [AssignedHorseNumber] INT   NOT NULL,
    [PlaceId]             INT   NULL,
    [WonAmount]           MONEY NOT NULL,
    CONSTRAINT [PK_EventRaceGuests] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_EventRaceGuests_EventRaces] FOREIGN KEY ([EventRaceId]) REFERENCES [dbo].[EventRaces] ([Id]),
    CONSTRAINT [FK_EventRaceGuests_Guests] FOREIGN KEY ([Guest1Id]) REFERENCES [dbo].[Guests] ([Id]),
    CONSTRAINT [FK_EventRaceGuests_Guests1] FOREIGN KEY ([Guest2Id]) REFERENCES [dbo].[Guests] ([Id]),
    CONSTRAINT [FK_EventRaceGuests_Places] FOREIGN KEY ([PlaceId]) REFERENCES [dbo].[Places] ([Id])
);
GO
ALTER TABLE [dbo].[EventRaceGuests] NOCHECK CONSTRAINT [FK_EventRaceGuests_Places]

