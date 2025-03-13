#include "FLEditorWidgetUtils.h"

#include "EditorAssetLibrary.h"
#include "EditorUtilitySubsystem.h"
#include "EditorUtilityWidgetBlueprint.h"
#include "AssetRegistry/AssetRegistryModule.h"
#include "Assets/TableDefines/DataTableDefine.h"
#include "Log/FLEditorLogChannels.h"

UEditorUtilityWidget* UFLEditorWidgetUtils::CreateEditorWidget(UObject* Asset)
{
	if(!Asset)
	{
		return nullptr;
	}
	auto* WidgetBlueprint = Cast<UEditorUtilityWidgetBlueprint>(Asset);
	if(!WidgetBlueprint)
	{
		UE_LOG(LogFLEditor, Error, TEXT("Load editor widget for %s failed, not editor widget bp"), *Asset->GetName());
		return nullptr;
	}

	UWorld* World = GEditor->GetEditorWorldContext().World();
	if (World)
	{
		UEditorUtilitySubsystem* EditorUtilitySubsystem = GEditor->GetEditorSubsystem<UEditorUtilitySubsystem>();
		return EditorUtilitySubsystem->SpawnAndRegisterTab(WidgetBlueprint);
	}
	else
	{
		UE_LOG(LogFLEditor, Error, TEXT("Create editor widget for %s failed, editor world is empty"), *Asset->GetName());
	}
	return nullptr;
}

UFLEditorUtitlitySubsystem* UFLEditorWidgetUtils::GetFLEditorUtilitySubsystem()
{
	return  GEditor->GetEditorSubsystem<UFLEditorUtitlitySubsystem>();
}

TArray<FAssetData> UFLEditorWidgetUtils::GetAllAsset(FName SearchPath, UClass* SearchType)
{
	FAssetRegistryModule& AssetRegistryModule = FModuleManager::LoadModuleChecked<FAssetRegistryModule>(FName("AssetRegistry"));
    IAssetRegistry& AssetRegistry = AssetRegistryModule.Get();

    FName PackagePath = (SearchPath == NAME_None) ? FName(TEXT("/Game")) : SearchPath;

    FARFilter BPFilter;
    BPFilter.PackagePaths.Add(PackagePath);
    BPFilter.bRecursivePaths = true;
    BPFilter.bRecursiveClasses = true;
    BPFilter.ClassPaths.Add(SearchType->GetClassPathName());

	TArray<FAssetData> AssetList;
    AssetRegistry.GetAssets(BPFilter, AssetList);
	return AssetList;
}

FString UFLEditorWidgetUtils::DataTableToJson(UDataTable* Table)
{
	return Table->GetTableAsJSON(EDataTableExportFlags::UseJsonObjectsForStructs);
}

TArray<FString> UFLEditorWidgetUtils::DataTableToArrayString(UDataTable* Table)
{
	TArray<FString> Result;
	auto Data = Table->GetTableData(EDataTableExportFlags::UseJsonObjectsForStructs);
	for (auto Strings : Data)
	{
		FString Line;
		for(int index = 0; index < Strings.Num(); ++index)
		{
			Line.Append(Strings[index]);
			if(index != Strings.Num() - 1)
			{
				Line.AppendChar(TEXT('\t'));
			}
		}
		Result.Add(Line);
	}

	return Result;
}
