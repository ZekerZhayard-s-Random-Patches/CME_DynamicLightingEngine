
var ASMAPI = Java.type("net.minecraftforge.coremod.api.ASMAPI");
var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var InsnNode = Java.type("org.objectweb.asm.tree.InsnNode");
var MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");

function initializeCoreMod() {
    return {
        "DynamicLightingEngine_<clinit>": {
            "target": {
                "type": "METHOD",
                "class": "com/legacy/lucent/dynamic_lighting/DynamicLightingEngine",
                "methodName": "<clinit>",
                "methodDesc": "()V"
            },
            "transformer": function (mn) {
                var insnList = mn.instructions.toArray();
                for (var i = 0; i < insnList.length; i++) {
                    var node = insnList[i];
                    if (node.getOpcode() === Opcodes.PUTSTATIC && node.owner.equals("com/legacy/lucent/dynamic_lighting/DynamicLightingEngine") && node.name.equals(ASMAPI.mapField("forcedLightData")) && node.desc.equals("Ljava/util/Map;")) {
                        mn.instructions.insertBefore(node, new InsnNode(Opcodes.POP));
                        mn.instructions.insertBefore(node, new MethodInsnNode(Opcodes.INVOKESTATIC, "io/github/zekerzhayard/cme_dynamiclightingengine/ConcurrentHashMapWithNullKey", "create", "()Ljava/util/Map;", false));
                    }
                }
                return mn;
            }
        }
    }
}
