package Program;
import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.swing.JOptionPane;
import Naptar.*;
import Oraren.*;

public class FileManager {
	
	public static boolean NaptarListaBeolvas(String file_name, ArrayList<Naptar_bejegyzes> Lista){
        
        try{
            System.setProperty("file.encoding", "UTF-8");
            BufferedReader BR = new BufferedReader(new FileReader(file_name));
            String s = BR.readLine();
			while(s!=null) {
				Naptar_bejegyzes NB = new Naptar_bejegyzes();
				String [] st = s.split(";");
				NB.setCim(st[0]); 
            	NB.setSDatum(st[1]);
            	NB.setMegjegyzes(st[2]);
                Lista.add(NB);
				s = BR.readLine();
			}
			BR.close();
        }catch(IOException hiba){
        	SM("CsvRider: "+hiba.getMessage(), 0);
            return false;
        }
        return true;
    }
	
	public static void NaptarListaKiir(String file_nDatume, ArrayList<Naptar_bejegyzes> Lista){
        String x = ";";
		try {
			PrintStream out = new PrintStream(new FileOutputStream(file_nDatume));
			for(int i = 0; i < Lista.size(); i++) {
				String Cim = Lista.get(i).getCim();
				String Datum = Lista.get(i).getSDatum();
				String Megjegyzes = Lista.get(i).getMegjegyzes();;
				out.println(Cim+x+Datum+x+Megjegyzes);
			}
			out.close();
		}catch(IOException ioe) {
			String uzi = ioe.getMessage();
			String uzi2 = "Data\\calendarlist.csv (A rendszer nem találja a megadott elérési utat)";
			if(uzi.equals(uzi2)) {
				mapaKeszito("Data");
			}
			SM("CsvWriter: "+ioe.getMessage(), 0);
		}
    }
	
	public static void SM(String msg, int tipus) {
		JOptionPane.showMessageDialog(null, msg, "Program üzenet", tipus);
	}
	
	public static void mapaKeszito(String nev) {
		try {

		    Path path = Paths.get(nev);

		    //java.nio.file.Files;
		    Files.createDirectories(path);


		  } catch (IOException e) {
			  SM("MappaKeszito: "+e.getMessage(), 0);
		  }
	}
	
	public static boolean orarendBeolvas(String file_name, Het[] het) {
		 try{
			 	int lepteto = 0;
	            System.setProperty("file.encoding", "UTF-8");
	            BufferedReader BR = new BufferedReader(new FileReader(file_name));
	            String s = BR.readLine();
				while(s!=null) {
					String [] nt = s.split("@");
					String [] st;
					st = nt[0].split(";");
					het[lepteto].setHetfo(st[0], st[1], st[2]);
					st = nt[1].split(";");
					het[lepteto].setKedd(st[0], st[1], st[2]);
					st = nt[2].split(";");
					het[lepteto].setSzerda(st[0], st[1], st[2]);
					st = nt[3].split(";");
					het[lepteto].setCsutortok(st[0], st[1], st[2]);
					st = nt[4].split(";");
					het[lepteto].setPentek(st[0], st[1], st[2]);
					lepteto++;
					s = BR.readLine();
				}
				BR.close();
	        }catch(IOException hiba){
	        	SM("TexRiderOrarend: "+hiba.getMessage(), 0);
	            return false;
	        }
	        return true;
	}
	
	public static void orarendKiir(String file_name, Het[] tomb) {
		String elem = ";";
		String nap = "@";
		try {
			PrintStream out = new PrintStream(new FileOutputStream(file_name));
			for(int i = 0; i < tomb.length; i++) {
				String H = tomb[i].getHetfo().getCim() +elem+ tomb[i].getHetfo().getOktato() +elem+ tomb[i].getHetfo().getTerem();
				String K = tomb[i].getKedd().getCim() +elem+ tomb[i].getKedd().getOktato() +elem+ tomb[i].getKedd().getTerem();
				String Sz = tomb[i].getSzerda().getCim() +elem+ tomb[i].getSzerda().getOktato() +elem+ tomb[i].getSzerda().getTerem();
				String Cs = tomb[i].getCsutortok().getCim() +elem+ tomb[i].getCsutortok().getOktato() +elem+ tomb[i].getCsutortok().getTerem();
				String P = tomb[i].getPentek().getCim() +elem+ tomb[i].getPentek().getOktato() +elem+ tomb[i].getPentek().getTerem();
				out.println(H+nap+K+nap+Sz+nap+Cs+nap+P);
			}
			out.close();
		}catch(IOException ioe) {
			SM("TexWriterOrared: "+ioe.getMessage(), 0);
		}
	}
	
	public static void sAtlagInsert(String nev, String kredit, String jegy, String filename) {
		String x = ";";
		try {
			PrintStream out = new PrintStream(new FileOutputStream(filename, true));
			out.println(nev+x+kredit+x+jegy);
			out.close();
			SM("Adatok kiírva", 1);
		}catch(IOException ioe) {
			SM("CsvWriter: "+ioe.getMessage(), 0);
		}
	}
	
	public static void sAtlagInsert(TablaKezelo etm, String filename) {
		String x = ";";
		try {
			PrintStream out = new PrintStream(new FileOutputStream(filename));
			out.println("Név;Kredit;Jegy");
			for(int i = 0; i < etm.getRowCount(); i++) {
				String nev = etm.getValueAt(i, 1).toString();
				String kredit = etm.getValueAt(i, 2).toString();
				String jegy = etm.getValueAt(i, 3).toString();
				out.println(nev+x+kredit+x+jegy);
			}
			out.close();
		}catch(IOException ioe) {
			SM("CsvWriter: "+ioe.getMessage(), 0);
		}
	}
	
	public static TablaKezelo sAtlagBeolvaso(String filename) {
		Object emptmn[] = {"Jel","Név","Kredit","Jegy"};
		TablaKezelo etm = new TablaKezelo(emptmn, 0);
		try {
			BufferedReader in = new BufferedReader(new FileReader(filename));
			String s = in.readLine();
			s = in.readLine();
			while(s!=null) {
				String [] st = s.split(";");
				etm.addRow(new Object[] {false, st[0], st[1], st[2]});
				s = in.readLine();
			}
			in.close();
		}catch (IOException ioe) {
			System.out.println("CsvReader: "+ioe.getMessage());
		}
		return etm;
	}

}
