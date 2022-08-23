package Naptar;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;

public class Naptar_bejegyzes {
	
	private String Cim;
	private Date Datum;
	private String SDatum;
	private String megjegyzes;
	
	public String getCim() {
		return Cim;
	}
	public void setCim(String cim) {
		this.Cim = cim;
	}
	public Date getDatum() {
		return Datum;
	}
	public void setDatum(String SDatum) {
		try {
			Date date=new SimpleDateFormat("yyyy/MM/dd").parse(SDatum);  
			this.Datum = date;
		}catch(ParseException e) {
			
		}
	}
	public String getSDatum() {
		return SDatum;
	}
	public void setSDatum(String SDatum) {
		this.SDatum = SDatum;
		setDatum(SDatum);
	}
	public String getMegjegyzes() {
		return megjegyzes;
	}
	public void setMegjegyzes(String megjegyzes) {
		this.megjegyzes = megjegyzes;
	}
	
	public Naptar_bejegyzes() {
		super();
	}
	
	public Naptar_bejegyzes(String cim, Date Datum, String megjegyzes) {
		super();
		this.Cim = cim;
		this.Datum = Datum;
		this.megjegyzes = megjegyzes;
	}
	
	@Override
	public String toString() {
		return "Cim = " + Cim + ", Dátum = " + Datum + ", Megjegyzés = " + megjegyzes + "\n";
	}
	
	
	
}
