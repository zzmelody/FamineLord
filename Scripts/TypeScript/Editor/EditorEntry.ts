import * as UE from 'ue';
import 'PuertsEditor/Entry';

function onEditorSatrtUp() {

}


const lydiaEditorUtilitySubsystem = UE.FLEditorWidgetUtils.GetFLEditorUtilitySubsystem();
lydiaEditorUtilitySubsystem.OnEditorStartUp.Add(onEditorSatrtUp);