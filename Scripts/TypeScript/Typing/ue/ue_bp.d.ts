/// <reference path="puerts.d.ts" />
declare module "ue" {
    import {$Ref, $Nullable} from "puerts"

    import * as cpp from "cpp"

    import * as UE from "ue"

// __TYPE_DECL_START: 3824BC30454349F16CBA38940B167206
    namespace Game.Editor.W_EditorEntry {
        class W_EditorEntry_C extends UE.EditorUtilityWidget {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            data_exporter_btn: UE.Button;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): W_EditorEntry_C;
            static Load(InName: string): W_EditorEntry_C;
        
            __tid_W_EditorEntry_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 2C6B286045883B4DBDBF9FBD03CC19E3
    namespace Game.Editor.W_DataExporter {
        class W_DataExporter_C extends UE.EditorUtilityWidget {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            data_table_path: UE.EditableTextBox;
            export_btn: UE.Button;
            export_path: UE.EditableTextBox;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): W_DataExporter_C;
            static Load(InName: string): W_DataExporter_C;
        
            __tid_W_DataExporter_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 9531A09643CEBDE316C61B8C5C687BA9
    namespace Game.Blueprints.TypeScript.Game.Engine.GameActors.TsCharacter {
        class TsCharacter_C extends UE.StarsCharacter {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            meshComp: UE.StaticMeshComponent;
            ExecuteUbergraph_TsCharacter(EntryPoint: number) : void;
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TsCharacter_C;
            static Load(InName: string): TsCharacter_C;
        
            __tid_TsCharacter_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: D6D773154931F6DE81EEBC98D9BCB611
    namespace Game.Blueprints.TypeScript.Game.Engine.GameActors.TsPlayerController {
        class TsPlayerController_C extends UE.StarsPlayerController {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TsPlayerController_C;
            static Load(InName: string): TsPlayerController_C;
        
            __tid_TsPlayerController_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: A1A0DCA7401A26BA9523758ED634DF0F
    namespace Game.Blueprints.TypeScript.Game.Engine.GameActors.TsPlayerState {
        class TsPlayerState_C extends UE.StarsPlayerState {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            DefaultSceneRoot: UE.SceneComponent;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TsPlayerState_C;
            static Load(InName: string): TsPlayerState_C;
        
            __tid_TsPlayerState_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 56CDDDC8485B3367004C85A78A2CF3F2
    namespace Game.Blueprints.TypeScript.Game.Engine.TsGameState {
        class TsGameState_C extends UE.GameState {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            DefaultSceneRoot: UE.SceneComponent;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TsGameState_C;
            static Load(InName: string): TsGameState_C;
        
            __tid_TsGameState_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: EC37F09944C3D02AA5F74685BA1E9053
    namespace Game.Blueprints.TypeScript.Game.Engine.TsGameMode {
        class TsGameMode_C extends UE.StartsGameMode {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            DefaultSceneRoot: UE.SceneComponent;
            ExecuteUbergraph_TsGameMode(EntryPoint: number) : void;
            ScriptLogin(NewPlayerController: $Nullable<UE.PlayerController>) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TsGameMode_C;
            static Load(InName: string): TsGameMode_C;
        
            __tid_TsGameMode_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: FF5A781C4478999DFEBFE392948442B1
    namespace Game.Blueprints.TypeScript.Game.Engine.TsGameMain {
        class TsGameMain_C extends UE.Actor {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            DefaultSceneRoot: UE.SceneComponent;
            ExecuteUbergraph_TsGameMain(EntryPoint: number) : void;
            ReceiveBeginPlay() : void;
            ReceiveEndPlay(EndPlayReason: UE.EEndPlayReason) : void;
            ReceiveTick(DeltaSeconds: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TsGameMain_C;
            static Load(InName: string): TsGameMain_C;
        
            __tid_TsGameMain_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 1FF6EC7041006EAB92012D8C17DDCE39
    namespace Game.Blueprints.TypeScript.Game.Engine.GameActors.TsAIController {
        class TsAIController_C extends UE.StarsAIController {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TsAIController_C;
            static Load(InName: string): TsAIController_C;
        
            __tid_TsAIController_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
}
