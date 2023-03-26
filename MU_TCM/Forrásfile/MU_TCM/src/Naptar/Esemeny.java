package Naptar;
import java.awt.EventQueue;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import java.awt.BorderLayout;
import java.awt.Color;
import javax.swing.JLabel;
import java.awt.GridLayout;
import javax.swing.JButton;
import javax.swing.JTextField;
import javax.swing.JTextArea;
import javax.swing.SwingConstants;
import java.awt.event.ActionListener;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.awt.event.ActionEvent;
import Program.*;

public class Esemeny extends JFrame {

	private JPanel contentPane;
	private JTextField textCim;
	private String sCim = "";
	private String sNot = "";
	
	

	private Ellenorzo c = new Ellenorzo();

	public Esemeny(ArrayList<Naptar_bejegyzes> lista, NaptarStruktura NS, String title, int uzistszam, String ev, String honap, String nap) {
		super("MU TCM: "+ev+"."+honap+'.'+nap+": "+title);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 523, 363);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setExtendedState(JFrame.MAXIMIZED_BOTH);
		String Sdate = ev+"/"+honap+"/"+nap;
		int gombok_alapota = 0;
			
		ArrayList<Naptar_bejegyzes> BLista = lista;
		if(!title.equals("-")) {
			sCim = title;
			sNot = BLista.get(uzistszam).getMegjegyzes();
			gombok_alapota = 1;
		}
		
		setContentPane(contentPane);
		contentPane.setLayout(new BorderLayout(0, 0));
		
		JPanel Felsoresz = new JPanel();
		Felsoresz.setBackground(new Color(128, 128, 255));
		contentPane.add(Felsoresz, BorderLayout.NORTH);
		Felsoresz.setLayout(new GridLayout(0, 3, 0, 0));
		
		JLabel EvLable = new JLabel(ev);
		Felsoresz.add(EvLable);
		
		JLabel HonapLabel = new JLabel(honapneve(honap));
		Felsoresz.add(HonapLabel);
		
		JLabel NapLabel = new JLabel(nap);
		Felsoresz.add(NapLabel);
		
		JPanel Kozepsoresz = new JPanel();
		Kozepsoresz.setBackground(new Color(225, 215, 157));
		contentPane.add(Kozepsoresz, BorderLayout.CENTER);
		Kozepsoresz.setLayout(new BorderLayout(0, 0));
		
		JPanel CimPanel = new JPanel();
		CimPanel.setBackground(new Color(230, 199, 153));
		Kozepsoresz.add(CimPanel, BorderLayout.NORTH);
		CimPanel.setLayout(new BorderLayout(0, 0));
		
		JLabel CimLabel = new JLabel("Cim: ");
		CimPanel.add(CimLabel, BorderLayout.WEST);
		
		textCim = new JTextField(sCim);
		CimPanel.add(textCim, BorderLayout.CENTER);
		textCim.setColumns(10);
		
		JPanel MegjegyzesPanel = new JPanel();
		MegjegyzesPanel.setBackground(new Color(230, 199, 153));
		Kozepsoresz.add(MegjegyzesPanel, BorderLayout.CENTER);
		MegjegyzesPanel.setLayout(new BorderLayout(0, 0));
		
		JLabel lblNewLabel = new JLabel("Leírás:");
		MegjegyzesPanel.add(lblNewLabel, BorderLayout.NORTH);
		
		JTextArea textArea = new JTextArea(sNot);
		MegjegyzesPanel.add(textArea, BorderLayout.CENTER);
		
		JPanel Alsoresz = new JPanel();
		Alsoresz.setBackground(new Color(255, 128, 128));
		contentPane.add(Alsoresz, BorderLayout.SOUTH);
		
		JButton btnUj = new JButton("Uj felvetel");
		btnUj.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				String cim = "";
				Date datum;
				String megjegyzes = "";
				Naptar_bejegyzes napbe = new Naptar_bejegyzes();
				if(c.filled(textCim, "Cím")) {
					cim = RTF(textCim);
					if(c.filled(textArea)) {
						megjegyzes = RTA(textArea);						
					}else {
						megjegyzes = RTF(textCim);
					}
					napbe.setCim(cim);
					napbe.setSDatum(Sdate);
					napbe.setMegjegyzes(megjegyzes);
					BLista.add(napbe);
					rendez(BLista);
					FileManager.NaptarListaKiir("Data\\calendarlist.csv", BLista);
					Naptar naptar = new Naptar(NS);
					dispose();
					naptar.setVisible(true);
				}
				
			}
		});
		Alsoresz.add(btnUj);
		
		JButton btnVissza = new JButton("Vissza");
		btnVissza.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Naptar naptar = new Naptar(NS);
				dispose();
				naptar.setVisible(true);
			}
		});
		
		JButton btnModosits = new JButton("Módosítás");
		btnModosits.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if(c.filled(textCim)) {
					BLista.get(uzistszam).setCim(RTF(textCim));
					if(c.filled(textArea)) {
						BLista.get(uzistszam).setMegjegyzes(RTA(textArea));
					}else {
						BLista.get(uzistszam).setMegjegyzes(RTF(textCim));
					}
					FileManager.NaptarListaKiir("Data\\calendarlist.csv", BLista);
					Naptar naptar = new Naptar(NS);
					dispose();
					naptar.setVisible(true);
				}
			}
		});
		Alsoresz.add(btnModosits);
		
		JButton btnTrls = new JButton("Tölés");
		btnTrls.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				ArrayList<Naptar_bejegyzes> temp = new ArrayList<>();
				for(int i = 0; i < BLista.size(); i++) {
					temp.add(BLista.get(i));
				}
				
				BLista.clear();
				for(int i = 0; i < temp.size(); i++) {
					if(i != uzistszam) {
						BLista.add(temp.get(i));
					}
				}
				FileManager.NaptarListaKiir("Data\\calendarlist.csv", BLista);
				Naptar naptar = new Naptar(NS);
				dispose();
				naptar.setVisible(true);
			}
		});
		Alsoresz.add(btnTrls);
		Alsoresz.add(btnVissza);
		
		
		
		if(gombok_alapota == 0) {
			btnModosits.setVisible(false);
			btnTrls.setVisible(false);
		}else if(gombok_alapota == 1) {
			btnUj.setVisible(false);
		}
	}
	
	public String RTF(JTextField jtf) {
		return jtf.getText();
	}
	
	public String RTA(JTextArea jta) {
		return jta.getText();
	}
	
	public static void rendez(ArrayList<Naptar_bejegyzes> lista) {
		Naptar_bejegyzes temp = new Naptar_bejegyzes();
		for(int i = 0; i < lista.size(); i++) {
			for(int j = 0; j < lista.size()-1; j++) {
				if(lista.get(j).getDatum().after(lista.get(j+1).getDatum())) {
					temp.setCim(lista.get(j).getCim());
					temp.setSDatum(lista.get(j).getSDatum());
					temp.setMegjegyzes(lista.get(j).getMegjegyzes());
					lista.get(j).setCim(lista.get(j+1).getCim());
					lista.get(j).setSDatum(lista.get(j+1).getSDatum());
					lista.get(j).setMegjegyzes(lista.get(j+1).getMegjegyzes());
					lista.get(j+1).setCim(temp.getCim());
					lista.get(j+1).setSDatum(temp.getSDatum());
					lista.get(j+1).setMegjegyzes(temp.getMegjegyzes());
				}
			}
		}
	}
	
	public static String honapneve(String dateTime) {
		String honap = "";
		String honap_szama = dateTime;
		
		if(honap_szama.equals("1")) {
			honap = "Január";
		}else if(honap_szama.equals("2")) {
			honap = "Február";
		}else if(honap_szama.equals("3")) {
			honap = "Március";
		}else if(honap_szama.equals("4")) {
			honap = "Április";
		}else if(honap_szama.equals("5")) {
			honap = "Május";
		}else if(honap_szama.equals("6")) {
			honap = "Június";
		}else if(honap_szama.equals("7")) {
			honap = "Július";
		}else if(honap_szama.equals("8")) {
			honap = "Agusztus";
		}else if(honap_szama.equals("9")) {
			honap = "Szeptember";
		}else if(honap_szama.equals("10")) {
			honap = "Október";
		}else if(honap_szama.equals("11")) {
			honap = "November";
		}else if(honap_szama.equals("12")) {
			honap = "December";
		}
		return honap;
	}

}
