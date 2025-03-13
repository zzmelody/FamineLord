// Fill out your copyright notice in the Description page of Project Settings.


#include "FLInputComponent.h"

#include "EnhancedInputSubsystems.h"
#include "GameFramework/GameUserSettings.h"
#include "Input/FLInputConfig.h"


// Sets default values for this component's properties
UFLInputComponent::UFLInputComponent(const FObjectInitializer& ObjectInitializer)
{
	// ...
}

void UFLInputComponent::AddInputMappings(const UFLInputConfig* InputConfig, UEnhancedInputLocalPlayerSubsystem* InputSubsystem) const
{
	check(InputConfig);
	check(InputSubsystem);
}

void UFLInputComponent::RemoveInputMappings(const UFLInputConfig* InputConfig, UEnhancedInputLocalPlayerSubsystem* InputSubsystem) const
{
	check(InputConfig);
	check(InputSubsystem);

	//const auto* LocalPlayer = InputSubsystem->GetLocalPlayer();
	//check(LocalPlayer);
	
	// if (ULyraSettingsLocal* LocalSettings = ULyraSettingsLocal::Get())
	// {
	// 	// Remove any registered input contexts
	// 	const TArray<FLoadedMappableConfigPair>& Configs = LocalSettings->GetAllRegisteredInputConfigs();
	// 	for (const FLoadedMappableConfigPair& Pair : Configs)
	// 	{
	// 		InputSubsystem->RemovePlayerMappableConfig(Pair.Config);
	// 	}
	// 	
	// 	// Clear any player mapped keys from enhanced input
	// 	for (const TPair<FName, FKey>& Pair : LocalSettings->GetCustomPlayerInputConfig())
	// 	{
	// 		InputSubsystem->RemovePlayerMappedKeyInSlot(Pair.Key);
	// 	}
	// }
}

void UFLInputComponent::RemoveBinds(TArray<uint32>& BindHandles)
{
	for (uint32 Handle : BindHandles)
	{
		RemoveBindingByHandle(Handle);
	}
	BindHandles.Reset();
}
