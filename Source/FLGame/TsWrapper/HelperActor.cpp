// Fill out your copyright notice in the Description page of Project Settings.


#include "HelperActor.h"

// Sets default values
AHelperActor::AHelperActor()
{
	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;
}

// Called when the game starts or when spawned
void AHelperActor::BeginPlay()
{
	Super::BeginPlay();

}

// Called every frame
void AHelperActor::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

	const auto _ = OnFLTick.ExecuteIfBound(DeltaTime);
}
