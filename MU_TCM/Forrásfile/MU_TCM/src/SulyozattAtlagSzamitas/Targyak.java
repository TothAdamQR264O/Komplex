package SulyozattAtlagSzamitas;


public class Targyak {
	private String nev;
	private int kredit;
	private int jegy;
	
	public String getNev() {
		return nev;
	}
	public void setNev(String nev) {
		this.nev = nev;
	}
	public int getKredit() {
		return kredit;
	}
	public void setKredit(int kredit) {
		this.kredit = kredit;
	}
	public int getJegy() {
		return jegy;
	}
	public void setJegy(int jegy) {
		this.jegy = jegy;
	}
	
	public Targyak(String nev, int kredit, int jegy) {
		super();
		this.nev = nev;
		this.kredit = kredit;
		this.jegy = jegy;
	}
	
	public Targyak() {
		super();
	}
	
	@Override
	public String toString() {
		return "Tárgy: Neve = " + nev + ", Kredit = " + kredit + ", Jegy = " + jegy;
	}
	
	
	
}
