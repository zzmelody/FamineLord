#include "FLEditorUtitlitySubsystem.h"

#include "Interfaces/IMainFrameModule.h"

UFLEditorUtitlitySubsystem::UFLEditorUtitlitySubsystem()
	:UEditorSubsystem()
{
}

void UFLEditorUtitlitySubsystem::Initialize(FSubsystemCollectionBase& Collection)
{
	Super::Initialize(Collection);

	// 参考自 UEditorUtilitySubsystem
	IMainFrameModule& MainFrameModule = IMainFrameModule::Get();
	if (MainFrameModule.IsWindowInitialized())
	{
		HandleStartup();
	}
	else
	{
		MainFrameModule.OnMainFrameCreationFinished().AddUObject(this, &ThisClass::MainFrameCreationFinished);
	}
}

void UFLEditorUtitlitySubsystem::HandleStartup()
{
	OnEditorStartUp.Broadcast();
}

void UFLEditorUtitlitySubsystem::MainFrameCreationFinished(TSharedPtr<SWindow> InRootWindow, bool bIsRunningStartupDialog)
{
	HandleStartup();
}
