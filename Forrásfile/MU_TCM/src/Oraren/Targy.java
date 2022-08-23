package Oraren;

public class Targy {
	private String Cim;
	private String Oktato;
	private String Terem;
	
	public String getCim() {
		return Cim;
	}
	public void setCim(String cim) {
		Cim = cim;
	}
	public String getOktato() {
		return Oktato;
	}
	public void setOktato(String oktato) {
		Oktato = oktato;
	}
	public String getTerem() {
		return Terem;
	}
	public void setTerem(String terem) {
		Terem = terem;
	}
	
	@Override
	public String toString() {
		return "Cim = " + Cim + ", Oktato = " + Oktato + ", Terem = " + Terem + "\n";
	}
	
	public Targy() {
		super();
		Cim = "-";
		Oktato = "-";
		Terem = "-";
	}
	
	public Targy(String cim, String oktato, String terem) {
		super();
		Cim = cim;
		Oktato = oktato;
		Terem = terem;
	}
	
	
	
}
