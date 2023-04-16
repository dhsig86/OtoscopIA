import java.util.Scanner;

public class DiagnosticoOtitis {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("Olá! Este programa irá auxiliá-lo a diagnosticar possíveis doenças no ouvido. Responda com SIM ou NÃO.");

    System.out.println("O paciente já teve isso antes?");
    String jaTeve = input.next();

    System.out.println("O paciente apresenta dor no ouvido?");
    String dorOuvido = input.next();

    System.out.println("O paciente apresenta dor ao tocar no pavilhão auricular?");
    String dorTocar = input.next();

    System.out.println("O paciente manipulou o ouvido ou foi exposto à água como piscina e mar?");
    String manipulouOuvido = input.next();

    System.out.println("O paciente apresenta febre?");
    String febre = input.next();

    System.out.println("O paciente apresenta sensação de ouvido tampado?");
    String ouvidoTampado = input.next();

    System.out.println("O paciente apresenta secreção no ouvido?");
    String secrecaoOuvido = input.next();

    System.out.println("O paciente apresenta coceira no ouvido?");
    String coceiraOuvido = input.next();

    System.out.println("O paciente apresenta dificuldade de audição?");
    String dificuldadeAudicao = input.next();

    String diagnostico = "";

    if (dorOuvido.equalsIgnoreCase("sim") && febre.equalsIgnoreCase("sim") && secrecaoOuvido.equalsIgnoreCase("sim")) {
        diagnostico = "Otite Média Aguda Bacteriana";
    } else if (dorOuvido.equalsIgnoreCase("sim") && febre.equalsIgnoreCase("sim") && ouvidoTampado.equalsIgnoreCase("sim")) {
        diagnostico = "Otite Média Aguda Viral";
    } else if (dorOuvido.equalsIgnoreCase("sim") && coceiraOuvido.equalsIgnoreCase("sim") && secrecaoOuvido.equalsIgnoreCase("sim")) {
        diagnostico = "Otite Externa Difusa";
    } else if (dorOuvido.equalsIgnoreCase("sim") && coceiraOuvido.equalsIgnoreCase("sim") && !secrecaoOuvido.equalsIgnoreCase("sim")) {
        diagnostico = "Otite Externa Localizada";
    } else if (dorOuvido.equalsIgnoreCase("sim") && secrecaoOuvido.equalsIgnoreCase("sim") && dificuldadeAudicao.equalsIgnoreCase("sim")) {
        diagnostico = "Otite Média Crônica Supurativa";
    } else if (coceiraOuvido.equalsIgnoreCase("sim") && secrecaoOuvido.equalsIgnoreCase("sim") && !dorOuvido.equalsIgnoreCase("sim")) {
        diagnostico = "Otite Externa Fúngica";
    } else if (dorOuvido.equalsIgnoreCase("sim") && jaTeve.equalsIgnoreCase("sim") && secrecaoOuvido.equalsIgnoreCase("sim")) {
        diagnostico = "Otite Média Crônica Simples";
    } else if (dorOuvido.equalsIgnoreCase("sim") && jaTeve.equalsIgnoreCase("sim") && dorTocar.equalsIgnoreCase("sim") && manipulouOuvido.equalsIgnoreCase("sim")) {
        diagnostico = "Otite Média Crônica Colesteatomatosa";
    } else {
        diagnostico = "Não foi possível realizar um diagnóstico com essas informações.";
    }

    System.out.println("O diagnóstico