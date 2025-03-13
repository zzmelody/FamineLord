#pragma once
#include "EditorUtilityWidget.h"
#include "FLEditorUtitlitySubsystem.h"
#include "FLEditorWidgetUtils.generated.h"

UCLASS()
class FLEDITOR_API UFLEditorWidgetUtils: public UBlueprintFunctionLibrary
{
	GENERATED_BODY()
public:
	UFUNCTION(BlueprintCallable)
	static UEditorUtilityWidget* CreateEditorWidget(UObject* Asset);

	UFUNCTION(BlueprintCallable)
	static UFLEditorUtitlitySubsystem* GetFLEditorUtilitySubsystem();

	UFUNCTION(BlueprintCallable)
	static TArray<FAssetData> GetAllAsset(FName SearchPath, UClass* SearchType);

	UFUNCTION(BlueprintCallable)
	static FString DataTableToJson(UDataTable* Table);

	// 将DataTable转成字符串数组，每一行中的每项使用\t分隔
	UFUNCTION(BlueprintCallable)
	static TArray<FString> DataTableToArrayString(UDataTable* Table);
};
