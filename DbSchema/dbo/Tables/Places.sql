﻿CREATE TABLE [dbo].[Places] (
    [Id]   INT           IDENTITY (1, 1) NOT NULL,
    [Name] NVARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Places] PRIMARY KEY CLUSTERED ([Id] ASC)
);

