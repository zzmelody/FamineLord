// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "EnhancedInputComponent.h"
#include "Input/FLInputConfig.h"
#include "FLInputComponent.generated.h"

class UEnhancedInputLocalPlayerSubsystem;

using InputActionId = uint32;
using InputBindHandleId = uint32;
using FInputActionBindHandleMap = TMap<InputActionId, InputBindHandleId>;

UCLASS(ClassGroup=(Custom), meta=(BlueprintSpawnableComponent))
class FLGAME_API UFLInputComponent : public UEnhancedInputComponent
{
	GENERATED_BODY()

public:
	// Sets default values for this component's properties
	UFLInputComponent(const FObjectInitializer& ObjectInitializer);
	void AddInputMappings(const UFLInputConfig* InputConfig, UEnhancedInputLocalPlayerSubsystem* InputSubsystem) const;
	void RemoveInputMappings(const UFLInputConfig* InputConfig, UEnhancedInputLocalPlayerSubsystem* InputSubsystem) const;

	template<class UserClass, typename FuncType>
	void BindNativeAction(const UFLInputConfig* InputConfig, const FGameplayTag& InputTag, ETriggerEvent TriggerEvent, UserClass* Object, FuncType Func, bool bLogIfNotFound);

	template<class UserClass, typename PressedFuncType, typename ReleasedFuncType>
	void BindAbilityActions(const UFLInputConfig* InputConfig, UserClass* Object, PressedFuncType PressedFunc, ReleasedFuncType ReleasedFunc, FInputActionBindHandleMap& BindHandles);

	void RemoveBinds(TArray<uint32>& BindHandles);
};

template<class UserClass, typename FuncType>
void UFLInputComponent::BindNativeAction(const UFLInputConfig* InputConfig, const FGameplayTag& InputTag, ETriggerEvent TriggerEvent, UserClass* Object, FuncType Func, bool bLogIfNotFound)
{
	check(InputConfig);
	if (const UInputAction* IA = InputConfig->FindNativeInputActionForTag(InputTag, bLogIfNotFound))
	{
		BindAction(IA, TriggerEvent, Object, Func);
	}
}

template<class UserClass, typename PressedFuncType, typename ReleasedFuncType>
void UFLInputComponent::BindAbilityActions(const UFLInputConfig* InputConfig, UserClass* Object, PressedFuncType PressedFunc, ReleasedFuncType ReleasedFunc, FInputActionBindHandleMap& BindHandles)
{
	check(InputConfig);

	for (const FFLInputAction& Action : InputConfig->AbilityInputActions)
	{
		if (Action.InputAction && Action.InputTag.IsValid())
		{
			if (PressedFunc)
			{
				const InputBindHandleId BindHandleId = BindAction(Action.InputAction, ETriggerEvent::Triggered, Object, PressedFunc, Action.InputTag).GetHandle();
				BindHandles.Add(Action.InputAction->GetUniqueID(), BindHandleId);
			}

			if (ReleasedFunc)
			{
				const InputBindHandleId BindHandleId = BindAction(Action.InputAction, ETriggerEvent::Completed, Object, ReleasedFunc, Action.InputTag).GetHandle();
				BindHandles.Add(Action.InputAction->GetUniqueID(), BindHandleId);
			}
		}
	}
}