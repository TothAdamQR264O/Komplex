package Oraren;

public class Het {
	private Targy Hetfo;
	private Targy Kedd;
	private Targy Szerda;
	private Targy Csutortok;
	private Targy Pentek;
	
	public Targy getHetfo() {
		return Hetfo;
	}
	public void setHetfo(String cim, String oktato, String terem) {
		this.Hetfo.setCim(cim);
		this.Hetfo.setOktato(oktato);
		this.Hetfo.setTerem(terem);
	}
	public Targy getKedd() {
		return Kedd;
	}
	public void setKedd(String cim, String oktato, String terem) {
		this.Kedd.setCim(cim);
		this.Kedd.setOktato(oktato);
		this.Kedd.setTerem(terem);
	}
	public Targy getSzerda() {
		return Szerda;
	}
	public void setSzerda(String cim, String oktato, String terem) {
		this.Szerda.setCim(cim);
		this.Szerda.setOktato(oktato);
		this.Szerda.setTerem(terem);
	}
	public Targy getCsutortok() {
		return Csutortok;
	}
	public void setCsutortok(String cim, String oktato, String terem) {
		this.Csutortok.setCim(cim);
		this.Csutortok.setOktato(oktato);
		this.Csutortok.setTerem(terem);
	}
	public Targy getPentek() {
		return Pentek;
	}
	public void setPentek(String cim, String oktato, String terem) {
		this.Pentek.setCim(cim);
		this.Pentek.setOktato(oktato);
		this.Pentek.setTerem(terem);
	}
	
	@Override
	public String toString() {
		return "Hetfo :\n" + Hetfo.toString() + "\nKedd :\n" + Kedd.toString() + "\n Szerda :\n" + Szerda.toString() + "\n Csutortok :\n" + Csutortok.toString()
				+ "\n Pentek :\n" + Pentek.toString() + "\n";
	}
	
	public Het() {
		super();
		Targy Hetfo = new Targy();
		this.Hetfo = Hetfo;
		Targy Kedd = new Targy();
		this.Kedd = Kedd;
		Targy Szerda = new Targy();
		this.Szerda = Szerda;
		Targy Csutortok = new Targy();
		this.Csutortok = Csutortok;
		Targy Pentek = new Targy();
		this.Pentek = Pentek;
	}
	
	
	public Het(Targy hetfo, Targy kedd, Targy szerda, Targy csutortok, Targy pentek) {
		super();
		Hetfo = hetfo;
		Kedd = kedd;
		Szerda = szerda;
		Csutortok = csutortok;
		Pentek = pentek;
	}
	
	
	
}
