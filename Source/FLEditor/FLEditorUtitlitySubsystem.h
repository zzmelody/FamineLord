#pragma once
#include "FLEditorUtitlitySubsystem.generated.h"

DECLARE_DYNAMIC_MULTICAST_DELEGATE(FOnEditorStartUp);

UCLASS()
class FLEDITOR_API UFLEditorUtitlitySubsystem: public UEditorSubsystem
{
	GENERATED_BODY()
public:
	UFLEditorUtitlitySubsystem();

	virtual void Initialize(FSubsystemCollectionBase& Collection) override;

	void HandleStartup();
	void MainFrameCreationFinished(TSharedPtr<SWindow> InRootWindow, bool bIsRunningStartupDialog);

	UPROPERTY(BlueprintAssignable)
	FOnEditorStartUp OnEditorStartUp;
};
