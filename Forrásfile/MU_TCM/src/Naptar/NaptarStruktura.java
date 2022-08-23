package Naptar;

import java.time.LocalDate;

public class NaptarStruktura {
	private int Ev;
	private int honap;
	private int meilykNap;
	
	public int getEv() {
		return Ev;
	}
	public void setEv(int ev) {
		Ev = ev;
	}
	public int getHonap() {
		return honap;
	}
	public void setHonap(int honap) {
		this.honap = honap;
	}
	public int getMeilykNap() {
		return meilykNap;
	}
	public void setMeilykNap(int meilykNap) {
		this.meilykNap = meilykNap;
	}
	
	public NaptarStruktura() {
		super();
	}
	
	public NaptarStruktura(LocalDate dateTime) {
		super();
		Ev = dateTime.getYear();
		this.honap = dateTime.getMonthValue();
		this.meilykNap = honapElsoNapja(dateTime);
	}
	
public static int honapElsoNapja(LocalDate dateTime) {
		int ertekR = 0;
		int mainap = dateTime.getDayOfMonth();
		String mainap_neve = ""+dateTime.getDayOfWeek();
		
		int hanyadikhet = mainap / 7;
		int kivonando = hanyadikhet * 7;
		int elsohet_napja = mainap - kivonando;
	
		if(elsohet_napja == 1) {
			if(mainap_neve.equals("MONDAY")) {
				ertekR = 0;
			}
			else if(mainap_neve.equals("TUESDAY")) {
				ertekR = 1;
			}
			else if(mainap_neve.equals("WEDNESDAY")) {
				ertekR = 2;
			}
			else if(mainap_neve.equals("THURSDAY")) {
				ertekR = 3;
			}
			else if(mainap_neve.equals("FRIDAY")) {
				ertekR = 4;
			}
			else if(mainap_neve.equals("SATURDAY")) {
				ertekR = 5;
			}
			else if(mainap_neve.equals("SUNDAY")) {
				ertekR = 6;
			}
		}else if(elsohet_napja == 2){
			if(mainap_neve.equals("MONDAY")) {
				ertekR = 6;
			}
			else if(mainap_neve.equals("TUESDAY")) {
				ertekR = 0;
			}
			else if(mainap_neve.equals("WEDNESDAY")) {
				ertekR = 1;
			}
			else if(mainap_neve.equals("THURSDAY")) {
				ertekR = 2;
			}
			else if(mainap_neve.equals("FRIDAY")) {
				ertekR = 3;
			}
			else if(mainap_neve.equals("SATURDAY")) {
				ertekR = 4;
			}
			else if(mainap_neve.equals("SUNDAY")) {
				ertekR = 5;
			}
		}else if(elsohet_napja == 3){
			if(mainap_neve.equals("MONDAY")) {
				ertekR = 5;
			}
			else if(mainap_neve.equals("TUESDAY")) {
				ertekR = 6;
			}
			else if(mainap_neve.equals("WEDNESDAY")) {
				ertekR = 0;
			}
			else if(mainap_neve.equals("THURSDAY")) {
				ertekR = 1;
			}
			else if(mainap_neve.equals("FRIDAY")) {
				ertekR = 2;
			}
			else if(mainap_neve.equals("SATURDAY")) {
				ertekR = 3;
			}
			else if(mainap_neve.equals("SUNDAY")) {
				ertekR = 4;
			}
		}else if(elsohet_napja == 4){
			if(mainap_neve.equals("MONDAY")) {
				ertekR = 4;
			}
			else if(mainap_neve.equals("TUESDAY")) {
				ertekR = 5;
			}
			else if(mainap_neve.equals("WEDNESDAY")) {
				ertekR = 6;
			}
			else if(mainap_neve.equals("THURSDAY")) {
				ertekR = 0;
			}
			else if(mainap_neve.equals("FRIDAY")) {
				ertekR = 1;
			}
			else if(mainap_neve.equals("SATURDAY")) {
				ertekR = 2;
			}
			else if(mainap_neve.equals("SUNDAY")) {
				ertekR = 3;
			}
		}else if(elsohet_napja == 5){
			if(mainap_neve.equals("MONDAY")) {
				ertekR = 3;
			}
			else if(mainap_neve.equals("TUESDAY")) {
				ertekR = 4;
			}
			else if(mainap_neve.equals("WEDNESDAY")) {
				ertekR = 5;
			}
			else if(mainap_neve.equals("THURSDAY")) {
				ertekR = 6;
			}
			else if(mainap_neve.equals("FRIDAY")) {
				ertekR = 0;
			}
			else if(mainap_neve.equals("SATURDAY")) {
				ertekR = 1;
			}
			else if(mainap_neve.equals("SUNDAY")) {
				ertekR = 2;
			}
		}else if(elsohet_napja == 6){
			if(mainap_neve.equals("MONDAY")) {
				ertekR = 2;
			}
			else if(mainap_neve.equals("TUESDAY")) {
				ertekR = 3;
			}
			else if(mainap_neve.equals("WEDNESDAY")) {
				ertekR = 4;
			}
			else if(mainap_neve.equals("THURSDAY")) {
				ertekR = 5;
			}
			else if(mainap_neve.equals("FRIDAY")) {
				ertekR = 6;
			}
			else if(mainap_neve.equals("SATURDAY")) {
				ertekR = 0;
			}
			else if(mainap_neve.equals("SUNDAY")) {
				ertekR = 1;
			}
		}else if(elsohet_napja == 0){
			if(mainap_neve.equals("MONDAY")) {
				ertekR = 1;
			}
			else if(mainap_neve.equals("TUESDAY")) {
				ertekR = 2;
			}
			else if(mainap_neve.equals("WEDNESDAY")) {
				ertekR = 3;
			}
			else if(mainap_neve.equals("THURSDAY")) {
				ertekR = 4;
			}
			else if(mainap_neve.equals("FRIDAY")) {
				ertekR = 5;
			}
			else if(mainap_neve.equals("SATURDAY")) {
				ertekR = 6;
			}
			else if(mainap_neve.equals("SUNDAY")) {
				ertekR = 0;
			}
		}
		
		return ertekR;
	}
	
}
