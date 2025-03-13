#pragma once
#include "Engine/DataTable.h"
#include "DataTableDefine.generated.h"

USTRUCT()
struct FFLTableRowBase: public FTableRowBase
{
	GENERATED_BODY()

	// 用作表的索引key
	UPROPERTY(BlueprintReadWrite, EditAnywhere)
	int32 KeyId;

	// 该行的名称，必须全英文
	UPROPERTY(BlueprintReadWrite, EditAnywhere)
	FString RowName;
};