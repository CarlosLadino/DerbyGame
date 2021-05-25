CREATE TABLE [dbo].[Guests] (
    [Id]         INT            IDENTITY (1, 1) NOT NULL,
    [Name]       NVARCHAR (50)  NOT NULL,
    [IsActive]   BIT            CONSTRAINT [DF_Guests_IsActive] DEFAULT ((0)) NOT NULL,
    [AvatarName] NVARCHAR (100) NULL,
    [IsSystem]   BIT            CONSTRAINT [DF_Guests_IsSystem] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_Guests] PRIMARY KEY CLUSTERED ([Id] ASC)
);

