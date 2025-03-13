// Fill out your copyright notice in the Description page of Project Settings.


using System.IO;
using UnrealBuildTool;

public class FLGame : ModuleRules
{
	public FLGame(ReadOnlyTargetRules Target) : base(Target)
	{
#if UE_5_3_OR_LATER
		PCHUsage = PCHUsageMode.NoPCHs;
#else
         PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;
#endif
		IncludeOrderVersion = EngineIncludeOrderVersion.Latest;
		bEnableUndefinedIdentifierWarnings = false;
		PublicIncludePaths.AddRange(
			new string[] {
				"FLGame"
			}
		);
		PublicDependencyModuleNames.AddRange(new string[]
		{
            // core
            "Core", "CoreUObject", "Engine",
            // utils
            "Json", "JsonUtilities",

            // net
            "Networking","Sockets",
            "ReplicationGraph", "NetCore",

            // ui
            "UMG", "SlateCore",

            // input
            "EnhancedInput", "InputCore",

            // ability
            "GameplayTags", "AIModule", "GameFeatures",

            // audio
            "AudioMixer"
		});

		PublicDependencyModuleNames.AddRange(new string[]
		{
			"Puerts",
		});

		PrivateDependencyModuleNames.AddRange(new string[]
		{
			"DeveloperSettings",
            "JsEnv",
		});

        if(Target.bBuildEditor)
        {
            PublicDependencyModuleNames.Add("Blutility");
        }
		// Uncomment if you are using Slate UI

		// PrivateDependencyModuleNames.AddRange(new string[] { "Slate", "SlateCore" });



		// Uncomment if you are using online features

		// PrivateDependencyModuleNames.Add("OnlineSubsystem");
		// To include OnlineSubsystemSteam, add it to the plugins section in your uproject file with the Enabled attribute set to true
	}

}
